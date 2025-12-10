export interface ToothCondition {
    id: number;
    status: 'healthy' | 'treatment-proposed' | 'critical' | 'watch';
    notes?: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    avatar?: string;
    teeth: ToothCondition[];
    mainComplaint: string;
    lastVisit: string;
}

export interface Bid {
    id: string;
    caseId: string;
    dentistId: string;
    dentistName: string;
    price: number;
    procedures: string[];
    rating: number;
    timestamp: string;
    status: 'active' | 'accepted' | 'rejected';
}

export interface DentalCase {
    id: string;
    patientId: string;
    status: 'Open for Bids' | 'In Progress' | 'Closed';
    title: string;
    location: string;
    postedDate: string;
    urgency: 'High' | 'Medium' | 'Low';
    images: string[];
}

// --- SEED DATA ---

// 1. Patients
export const MOCK_PATIENTS: Record<string, Patient> = {
    'p1': {
        id: 'p1',
        name: 'John Doe',
        age: 34,
        gender: 'Male',
        mainComplaint: 'Severe pain in upper left molar (Tooth #14). Sensitivity to cold.',
        lastVisit: '6 months ago',
        teeth: [
            { id: 14, status: 'critical', notes: 'Deep caries, likely pulp involvement.' },
            { id: 3, status: 'watch', notes: 'Minor chip.' }
        ]
    },
    'p2': {
        id: 'p2',
        name: 'Sarah Jenkins',
        age: 28,
        gender: 'Female',
        mainComplaint: 'Cosmetic consultation for front teeth spacing.',
        lastVisit: '1 year ago',
        teeth: [
            { id: 8, status: 'treatment-proposed', notes: 'Diastema closure.' },
            { id: 9, status: 'treatment-proposed', notes: 'Diastema closure.' }
        ]
    },
    'p3': {
        id: 'p3',
        name: 'Michael Ross',
        age: 45,
        gender: 'Male',
        mainComplaint: 'Lost a filling while eating.',
        lastVisit: '3 months ago',
        teeth: [
            { id: 30, status: 'critical', notes: 'Lost restoration, exposed dentin.' }
        ]
    }
};

// 2. Cases (Linked to Patients)
export const MOCK_CASES: DentalCase[] = [
    {
        id: 'c101',
        patientId: 'p1',
        title: 'Emergency: Molar Pain',
        status: 'Open for Bids',
        location: 'San Francisco, CA (SoMa)',
        postedDate: '1 hour ago',
        urgency: 'High',
        images: ["https://images.unsplash.com/photo-1516069677934-cc33fa3e1f59?q=80&w=2600&auto=format&fit=crop"]
    },
    {
        id: 'c102',
        patientId: 'p2',
        title: 'Cosmetic: Gap Closure',
        status: 'Open for Bids',
        location: 'San Francisco, CA (Mission)',
        postedDate: '3 hours ago',
        urgency: 'Medium',
        images: ["https://plus.unsplash.com/premium_photo-1661777196224-bdae4af2e271?q=80&w=2600&auto=format&fit=crop"]
    },
    {
        id: 'c103',
        patientId: 'p3',
        title: 'Restorative: Lost Filling',
        status: 'Open for Bids',
        location: 'Oakland, CA',
        postedDate: '5 hours ago',
        urgency: 'Low',
        images: []
    }
];

// 3. Bids
export const MOCK_BIDS: Bid[] = [
    {
        id: 'b1',
        caseId: 'c101',
        dentistId: 'd1',
        dentistName: 'Dr. Emily Chen',
        price: 1250,
        procedures: ['Root Canal (D3330)', 'PFM Crown (D2750)'],
        rating: 4.9,
        timestamp: '10 mins ago',
        status: 'active'
    },
    {
        id: 'b2',
        caseId: 'c101',
        dentistId: 'd2',
        dentistName: 'Dr. Mark Stone',
        price: 980,
        procedures: ['Extraction (D7140)', 'Implant Consult'],
        rating: 4.7,
        timestamp: '25 mins ago',
        status: 'active'
    }
];

// --- STORE METHODS (Simulating API) ---

export const getCases = () => MOCK_CASES;

export const getCaseById = (id: string) => {
    const c = MOCK_CASES.find(x => x.id === id);
    if (!c) return null;
    const patient = MOCK_PATIENTS[c.patientId];
    return { ...c, patient }; // Join Data
};


export const getBidsForCase = (caseId: string) => {
    return MOCK_BIDS.filter(b => b.caseId === caseId);
};

export const addBid = (bid: Omit<Bid, 'id' | 'timestamp' | 'status'>) => {
    const newBid: Bid = {
        ...bid,
        id: `b${Date.now()}`,
        timestamp: new Date().toISOString(), // In real app, this would be formatted relative time logic or standard ISO
        status: 'active'
    };
    MOCK_BIDS.unshift(newBid); // Add to top
    return newBid;
};

