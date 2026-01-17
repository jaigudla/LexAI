import axios from 'axios';

const API_URL = 'http://localhost:8080/api/documents';

export interface LexDocument {
    id: number;
    filename: string;
    storagePath: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    uploadedAt: string;
    summary?: string;
}

export const getDocuments = async (): Promise<LexDocument[]> => {
    // Mock data if backend is unreachable (for dev only)
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.warn('Backend not reachable, using mock data');
        return [
            { id: 1, filename: 'NDA_Partner_A.pdf', storagePath: 's3://...', status: 'COMPLETED', uploadedAt: new Date().toISOString(), summary: 'Non-disclosure agreement with standard terms.' },
            { id: 2, filename: 'Service_Agreement_v2.docx', storagePath: 's3://...', status: 'PROCESSING', uploadedAt: new Date().toISOString() },
            { id: 3, filename: 'Legacy_Contract_2024.pdf', storagePath: '', status: 'PENDING', uploadedAt: new Date().toISOString() }
        ];
    }
};

export const uploadDocument = async (file: File): Promise<LexDocument> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.warn('Backend not reachable, returning mock response');
        return {
            id: Math.floor(Math.random() * 1000),
            filename: file.name,
            storagePath: 'mock/path',
            status: 'PENDING',
            uploadedAt: new Date().toISOString()
        };
    }
};

export const getDocument = async (id: number): Promise<LexDocument> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return {
            id,
            filename: 'Mock_Agreement.pdf',
            storagePath: 'mock/path',
            status: 'COMPLETED',
            uploadedAt: new Date().toISOString(),
            summary: 'This agreement establishes a service relationship between Provider and Client...',
            data: 'Full extracted text content would appear here.'
        } as LexDocument;
    }
};
