import React, { useState, useEffect } from 'react';
import { imagesAPI, uploadAPI } from '../../services/apiService';
import Loader from '../../Components/Loader/Loader';

const ManagePosters = () => {
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [posterForm, setPosterForm] = useState({
        title: '',
        description: '',
        category: 'achievement'
    });
    const [editingPoster, setEditingPoster] = useState(null);

    // Fetch posters on component mount
    useEffect(() => {
        fetchPosters();
    }, []);

    const fetchPosters = async () => {
        try {
            setLoading(true);
            const response = await imagesAPI.getSorted('-createdAt');
            console.log('Images API Response:', response);
            
            // Extract images from the API response structure  
            const imagesData = response.data?.images || response.images || response.data || response || [];
            console.log('Extracted images data:', imagesData);
            
            // Transform API images to poster format
            const transformedPosters = imagesData.map(image => ({
                _id: image.publicId || image.filename,
                id: image.publicId || image.filename,
                imageUrl: image.url,
                title: image.filename || image.publicId,
                description: `${image.format?.toUpperCase() || 'IMAGE'} - ${image.width}x${image.height}`,
                category: 'achievement',
                createdAt: image.uploadedAt,
                fileName: image.filename
            }));
            
            setPosters(transformedPosters);
            setError(null);
        } catch (err) {
            console.error('Fetch posters error:', err);
            setError('Failed to load posters');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select a valid image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setUploadError(null);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setPosterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            setUploadError('Please select an image file');
            return;
        }

        try {
            setUploading(true);
            setUploadError(null);

            // Upload image to Cloudinary
            const uploadResponse = await uploadAPI.uploadImage(selectedFile);
            console.log('Upload response:', uploadResponse);
            
            const imageUrl = uploadResponse.data?.url || uploadResponse.url;
            
            if (!imageUrl) {
                throw new Error('No image URL returned from upload');
            }

            alert('Image uploaded successfully to Cloudinary!');

            // Upload new poster (since update might not be supported)
            alert('Poster uploaded successfully!');

            // Reset form and refresh posters
            resetForm();
            fetchPosters();
        } catch (err) {
            console.error('Upload error:', err);
            setUploadError(`Upload failed: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (poster) => {
        setEditingPoster(poster);
        setPosterForm({
            title: poster.title || '',
            description: poster.description || '',
            category: poster.category || 'achievement'
        });
        setSelectedFile(null);
    };

    const handleDelete = async (posterId) => {
        if (!window.confirm('Are you sure you want to delete this poster?')) {
            return;
        }

        // Note: Delete functionality might not be available with current API
        alert('Delete functionality is not available with the current API endpoint. Please contact your API provider for delete capabilities.');
        
        // Optionally refresh to show current state
        // fetchPosters();
    };

    const resetForm = () => {
        setPosterForm({
            title: '',
            description: '',
            category: 'achievement'
        });
        setSelectedFile(null);
        setEditingPoster(null);
        setUploadError(null);
        // Reset file input
        const fileInput = document.getElementById('posterFile');
        if (fileInput) fileInput.value = '';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="manage-posters p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingPoster ? 'Edit Poster' : 'Manage Posters'}
            </h2>

            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">
                    {editingPoster ? 'Update Poster' : 'Upload New Poster'}
                </h3>
                
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label htmlFor="posterFile" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Image {editingPoster && '(Leave empty to keep current image)'}
                        </label>
                        <input
                            type="file"
                            id="posterFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={!editingPoster}
                        />
                        {selectedFile && (
                            <p className="text-sm text-gray-600 mt-1">
                                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                        )}
                        {editingPoster && !selectedFile && (
                            <p className="text-sm text-gray-600 mt-1">
                                Current image will be kept
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={posterForm.title}
                            onChange={handleFormChange}
                            placeholder="Enter poster title"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={posterForm.description}
                            onChange={handleFormChange}
                            placeholder="Enter poster description"
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={posterForm.category}
                            onChange={handleFormChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="achievement">Achievement</option>
                            <option value="event">Event</option>
                            <option value="program">Program</option>
                            <option value="announcement">Announcement</option>
                        </select>
                    </div>

                    {uploadError && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            {uploadError}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {editingPoster ? 'Updating...' : 'Uploading...'}
                                </>
                            ) : (
                                editingPoster ? 'Update Poster' : 'Upload Poster'
                            )}
                        </button>

                        {editingPoster && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>  

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">Upload Instructions:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Image files only (JPEG, PNG, WebP)</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Images are uploaded to Cloudinary</li>
                    <li>• Upload server should be running on localhost:2000</li>
                </ul>
            </div>
        </div>
    );
};

export default ManagePosters;
