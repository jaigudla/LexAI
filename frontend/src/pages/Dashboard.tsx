import { useEffect, useState } from 'react';
import { type LexDocument, getDocuments } from '../services/api';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [documents, setDocuments] = useState<LexDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        setLoading(true);
        const data = await getDocuments();
        setDocuments(data);
        setLoading(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle className="text-success" size={18} />;
            case 'PROCESSING': return <Clock className="text-warning animate-spin-slow" size={18} />; // animate-spin-slow needs css
            case 'PENDING': return <Clock className="text-text-secondary" size={18} />;
            case 'FAILED': return <AlertCircle className="text-error" size={18} />;
            default: return null;
        }
    };

    return (
        <div>
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-text-secondary">Manage and analyze your legal documents.</p>
                </div>
                <button className="btn btn-primary" onClick={loadDocuments}>Refresh</button>
            </header>

            {loading ? (
                <div className="text-center py-12 text-text-secondary">Loading documents...</div>
            ) : (
                <div className="grid gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="card flex items-center justify-between hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-surface-hover">
                                    <FileText className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{doc.filename}</h3>
                                    <p className="text-sm text-text-secondary flex items-center gap-2">
                                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border">
                                    {getStatusIcon(doc.status)}
                                    <span className="text-sm font-medium">{doc.status}</span>
                                </div>
                                <a href={`/documents/${doc.id}`} className="text-primary hover:text-primary-hover font-medium text-sm">
                                    View Analysis
                                </a>
                            </div>
                        </div>
                    ))}

                    {documents.length === 0 && (
                        <div className="text-center py-12 card border-dashed">
                            <p className="text-text-secondary mb-4">No documents found.</p>
                            <a href="/upload" className="btn btn-primary">Upload your first document</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
