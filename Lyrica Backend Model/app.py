from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from urllib.parse import unquote
import numpy as np
import os

# Initialize app
app = Flask(__name__)
CORS(app)

# Load and preprocess data
df = pd.read_csv("./data.csv")
df = df.sample(n=5000, random_state=42).reset_index(drop=True)

numerical_features = ['valence', 'danceability', 'energy', 'tempo', 'acousticness',
                      'liveness', 'speechiness', 'instrumentalness']

# Standardization
scaler = StandardScaler()
df_scaled = pd.DataFrame(scaler.fit_transform(df[numerical_features]), columns=numerical_features)

# Clustering
optimal_k = 5
kmeans = KMeans(n_clusters=optimal_k, random_state=42)
df["cluster"] = kmeans.fit_predict(df_scaled)

# Add lowercase column for easier matching
df["name_lower"] = df["name"].str.lower()


# --- Recommendation Logic ---
def recommend_songs(song_name, df, num_recommendations=5):
    song_name = song_name.strip().lower()

    if song_name not in df["name_lower"].values:
        return None

    song_cluster = df[df["name_lower"] == song_name]["cluster"].values[0]
    same_cluster_songs = df[df["cluster"] == song_cluster].reset_index(drop=True)

    song_rows = same_cluster_songs[same_cluster_songs["name"].str.lower() == song_name]
    if song_rows.empty:
        return None

    song_index = song_rows.index[0]
    cluster_features = same_cluster_songs[numerical_features]
    similarity = cosine_similarity(cluster_features, cluster_features)

    similarities = list(enumerate(similarity[song_index]))
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
    top_similar = [i for i, _ in similarities if i != song_index][:num_recommendations]

    recommendations = same_cluster_songs.iloc[top_similar][["name", "year", "artists"]]
    return recommendations.to_dict(orient='records')


# --- Flask Routes ---
@app.route('/api/allSongs', methods=['GET'])
def get_all_songs():
    all_songs = df[["name", "year", "artists"]].drop_duplicates().to_dict(orient='records')
    return jsonify({'data': all_songs})


@app.route('/api/recommend/<song_name>', methods=['GET'])
def recommend(song_name):
    decoded_song_name = unquote(song_name)  # Handle URL encoding (e.g. Love%20Story)
    recommendations = recommend_songs(decoded_song_name, df)
    if recommendations is None:
        return jsonify({'error': f"Song '{decoded_song_name}' not found in dataset."}), 404
    return jsonify({'recommendations': recommendations})


# Run the server
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
