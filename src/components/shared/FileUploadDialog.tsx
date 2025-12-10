'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, FileText, Image, Loader2, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    status: 'uploading' | 'complete' | 'error';
    progress: number;
}

export function FileUploadDialog({ trigger }: { trigger: React.ReactNode }) {
    const { addToast } = useToast();
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;

        const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'uploading' as const,
            progress: 0
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Simulate upload progress for each file
        newFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(prev => prev.map(f =>
                        f.id === file.id ? { ...f, status: 'complete', progress: 100 } : f
                    ));
                } else {
                    setFiles(prev => prev.map(f =>
                        f.id === file.id ? { ...f, progress: Math.min(progress, 99) } : f
                    ));
                }
            }, 200);
        });
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const handleComplete = () => {
        const completeCount = files.filter(f => f.status === 'complete').length;
        addToast('success', `${completeCount} file${completeCount !== 1 ? 's' : ''} uploaded successfully!`);
        setFiles([]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-brand-primary" />
                        Upload Dental Records
                    </DialogTitle>
                    <DialogDescription>
                        Upload your X-rays, intraoral photos, or treatment plans. Supported formats: JPEG, PNG, DICOM.
                    </DialogDescription>
                </DialogHeader>

                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                        isDragging
                            ? "border-brand-primary bg-brand-primary/5"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.dcm"
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-700">Drag & drop files here</p>
                    <p className="text-sm text-slate-400 mt-1">or click to browse</p>
                </div>

                {files.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {files.map(file => (
                            <div key={file.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                    {file.type.startsWith('image')
                                        ? <Image className="h-5 w-5 text-blue-500" />
                                        : <FileText className="h-5 w-5 text-slate-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-400">{formatSize(file.size)}</span>
                                        {file.status === 'uploading' && (
                                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-brand-primary transition-all duration-300"
                                                    style={{ width: `${file.progress}%` }}
                                                />
                                            </div>
                                        )}
                                        {file.status === 'complete' && (
                                            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" /> Complete
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                                >
                                    <X className="h-4 w-4 text-slate-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setFiles([])}
                        disabled={files.length === 0}
                    >
                        Clear All
                    </Button>
                    <Button
                        className="flex-1 bg-brand-primary hover:bg-brand-primary/90"
                        onClick={handleComplete}
                        disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
                    >
                        {files.some(f => f.status === 'uploading') && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
