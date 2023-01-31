declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      name: string;
      courses: Array<number>;
      role: string;
    };
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       context: Context;
//     }
//   }
// }
