const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

// Cosine similarity function (unchanged)
const cosineSimilarity = (vecA, vecB) => {
    if (vecA.length === 0 || vecB.length === 0) {
        console.error("One of the vectors is empty. Cannot compute similarity.");
        return null;
    }

    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
        console.error("One of the magnitudes is zero. Cannot compute similarity.");
        return null;
    }

    return dotProduct / (magnitudeA * magnitudeB);
};

// Load the Universal Sentence Encoder model
const loadUseModel = async () => {
    const model = await use.load(); // Load the Universal Sentence Encoder model
    return model;
};

// Get embeddings using Universal Sentence Encoder
const getUseEmbeddings = async (model, text) => {
    const embeddings = await model.embed([text]); // Get the embeddings for the text (single element array)
    const embeddingArray = embeddings.arraySync()[0]; // Convert the tensor to an array
    return embeddingArray;
};

// Compute similarity using USE embeddings
const computeUseSimilarity = async (jobDescription, clientSkills) => {
    const model = await loadUseModel();

    // Get USE embeddings for job description and client skills
    const jobEmbedding = await getUseEmbeddings(model, jobDescription);
    const clientEmbedding = await getUseEmbeddings(model, clientSkills);

    // Compute cosine similarity
    const similarityScore = cosineSimilarity(jobEmbedding, clientEmbedding);

    console.log("Job Embedding:", jobEmbedding);
    console.log("Client Embedding:", clientEmbedding);
    console.log("Similarity Score:", similarityScore);

    return similarityScore;
};

module.exports = { cosineSimilarity, computeUseSimilarity };