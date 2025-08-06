import React, { useState } from 'react';
import { uploadAPI } from '../services/apiService';

const TestUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError(null);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        try {
            setUploading(true);
            setError(null);
            
            const response = await uploadAPI.uploadImage(selectedFile);
            setResult(response);
            console.log('Upload successful:', response);
        } catch (err) {
            setError(err.message);
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Test Image Upload</h3>
            
            <div className="space-y-4">
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
                </button>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                        Error: {error}
                    </div>
                )}

                {result && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-green-700 font-semibold">Upload Successful!</p>
                        <p className="text-sm text-gray-600 mt-2">
                            URL: <a href={result.data?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {result.data?.url}
                            </a>
                        </p>
                        {result.data?.url && (
                            <img 
                                src={result.data.url} 
                                alt="Uploaded" 
                                className="mt-2 max-w-full h-auto rounded"
                                style={{maxHeight: '200px'}}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestUpload;
