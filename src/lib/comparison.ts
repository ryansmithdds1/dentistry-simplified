export interface TreatmentBid {
    dentistId: string;
    dentistName: string;
    rating: number; // 1-5
    totalPrice: number;
    procedures: PreparedProcedure[];
}

export interface PreparedProcedure {
    toothId: number; // Universal Numbering System
    adaCode: string;
    description: string;
    price: number;
    category: "Restorative" | "Preventative" | "Major" | "Endodontic" | "Periodontic" | "Other";
}

export interface ComparisonRow {
    toothId: number;
    toothLabel: string;
    cells: ComparisonCell[];
}

export interface ComparisonCell {
    dentistId: string;
    procedure?: PreparedProcedure; // Undefined means "No Treatment Proposed"
}

// Helper to categorize ADA codes (Simplified)
function getCategory(code: string): PreparedProcedure['category'] {
    if (code.startsWith("D2")) return "Restorative"; // Crowns, Fillings
    if (code.startsWith("D3")) return "Endodontic"; // Root Canals
    if (code.startsWith("D4")) return "Periodontic"; // Gums
    return "Other";
}

/**
 * The Core Logic: Aligns bids side-by-side based on Tooth ID.
 * This ensures "Apples to Apples" comparison.
 */
export function buildComparisonGrid(bids: TreatmentBid[]): ComparisonRow[] {
    // 1. Identify all unique teeth involved across ALL bids
    const allToothIds = new Set<number>();
    bids.forEach(bid => {
        bid.procedures.forEach(proc => allToothIds.add(proc.toothId));
    });

    // 2. Sort teeth numerically
    const sortedTeeth = Array.from(allToothIds).sort((a, b) => a - b);

    // 3. Build the rows
    const grid: ComparisonRow[] = sortedTeeth.map(toothId => {
        const cells: ComparisonCell[] = bids.map(bid => {
            const procedure = bid.procedures.find(p => p.toothId === toothId);
            return {
                dentistId: bid.dentistId,
                procedure // Can be undefined (The "Gap" Rule)
            };
        });

        return {
            toothId,
            toothLabel: `Tooth #${toothId}`,
            cells
        };
    });

    return grid;
}
