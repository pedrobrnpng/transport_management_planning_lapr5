export interface Point {
    x: number;
    y: number;
}

export interface Vector {
    x: number;
    y: number;
}

export class Math {
    
    /**
     * Calculate a vector given two points
     * @param A 
     * @param B 
     */
    public static vector(A: Point, B: Point): Vector {
        return {
            x: B.x - A.x,
            y: B.y - A.y
        };
    }
}
