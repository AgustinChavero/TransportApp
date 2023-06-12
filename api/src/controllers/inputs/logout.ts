import { Request, Response } from 'express';


export const logoutAll = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.json({ message: "Logout exitoso" });
    });

};

