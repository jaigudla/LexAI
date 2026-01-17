import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type LexDocument, getDocument } from '../services/api';
import { FileText, ArrowLeft, Download } from 'lucide-react';

const ResultsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [document, setDocument] = useState<LexDocument | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadDocument(parseInt(id));
        }
    }, [id]);

    const loadDocument = async (docId: number) => {
        setLoading(true);
        const data = await getDocument(docId);
        setDocument(data);
        setLoading(false);
    };

    if (loading) return <div className="p-8 text-center text-text-secondary">Loading analysis...</div>;
    if (!document) return <div className="p-8 text-center text-error">Document not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-6">
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            <header className="flex items-center justify-between mb-8 border-b border-border pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="text-primary w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{document.filename}</h1>
                        <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                            <span>Uploaded {new Date(document.uploadedAt).toLocaleDateString()}</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-xs uppercase font-medium">
                                {document.status}
                            </span>
                        </div>
                    </div>
                </div>
                <button className="btn hover:bg-surface border border-border">
                    <Download size={18} />
                    Download JSON
                </button>
            </header>

            <div className="grid gap-8">
                <section className="card">
                    <h2 className="text-lg font-semibold mb-4 text-primary">AI Summary</h2>
                    <p className="text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-md">
                        {document.summary || "No summary available."}
                    </p>
                </section>

                <section className="card">
                    <h2 className="text-lg font-semibold mb-4">Extracted Clauses & Risks</h2>
                    <div className="space-y-4">
                        <div className="p-4 border border-border rounded-md bg-background">
                            <h3 className="font-medium mb-2 text-warning">Risk: Termination Clause</h3>
                            <p className="text-sm text-text-secondary">
                                "Either party may terminate this agreement with 24 hours notice."
                                <br />
                                <span className="italic text-xs mt-1 block">Analysis: Short notice period poses operational risk.</span>
                            </p>
                        </div>
                        <div className="p-4 border border-border rounded-md bg-background">
                            <h3 className="font-medium mb-2 text-success">Clause: Confidentiality</h3>
                            <p className="text-sm text-text-secondary">
                                "Standard 2-year confidentiality term post-termination."
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResultsPage;
