import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../services/api';
import { UploadCloud, File, X } from 'lucide-react';

const UploadPage = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            await uploadDocument(selectedFile);
            // Simulate delay for effect if mock
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
            <p className="text-text-secondary mb-8">Upload a legal contract (PDF, DOCX) for AI analysis.</p>

            <div
                className={`
                    border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer
                    ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                    ${selectedFile ? 'bg-surface' : 'bg-surface/50'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.docx,.doc"
                />

                {!selectedFile ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-background rounded-full shadow-sm">
                            <UploadCloud className="text-primary w-10 h-10" />
                        </div>
                        <div>
                            <p className="text-lg font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-text-secondary text-sm">PDF, DOCX (Max 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-background p-4 rounded-md border border-border">
                        <div className="flex items-center gap-3">
                            <File className="text-primary" />
                            <div className="text-left">
                                <p className="font-medium text-sm">{selectedFile.name}</p>
                                <p className="text-text-secondary text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                            className="p-1 hover:bg-surface-hover rounded full"
                        >
                            <X size={20} className="text-text-secondary" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    className="btn hover:bg-surface-hover text-text-secondary"
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
                <button
                    className={`btn btn-primary ${!selectedFile || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedFile || isUploading}
                    onClick={handleUpload}
                >
                    {isUploading ? 'Uploading...' : 'Analyze Document'}
                </button>
            </div>
        </div>
    );
};

export default UploadPage;
