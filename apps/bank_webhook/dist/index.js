"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
// import bycrpt 
const zod_1 = require("zod");
const jwtSecret = "sr1435";
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/getBalance", async (req, res) => {
    const userId = (req.body.userId);
    const passcode = req.body.passcode;
    //    console.log(userId)
    try {
        var data = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (data) {
            if (passcode == data.passcode) {
                return res.status(200).json(data.balance);
            }
            else {
                return res.status(202).json({
                    msg: "Wrong Passcode"
                });
            }
        }
    }
    catch (error) {
        return res.status(202).json({ error: error.message });
    }
});
app.post("/transaction", async (req, res) => {
    //type : transact , deposit
    // merchantId or Userid or to wallet
    const body = req.body;
    const schema = zod_1.z.object({
        OnRampStatus: zod_1.z.literal("Success").or(zod_1.z.literal("Processing")).or(zod_1.z.literal("Failure")),
        type: zod_1.z.literal("transact").or(zod_1.z.literal("deposit")),
        token: zod_1.z.string(),
        provider: zod_1.z.string(),
        amount: zod_1.z.number(),
    });
    //also the passcode within the token and not in the post request
    //transact-send a token with senderEmail &&receiverPhone(p2p) or merchantEmail
    //deposit - send a token with merchantId or just userId and type -deposit
    //wallet falls under merchantId that is to be provided 
    const check = schema.safeParse(body);
    const decoded = jsonwebtoken_1.default.verify(body.token, jwtSecret);
    const user = await prisma.user.findFirst({
        where: { email: decoded.senderEmail }
    });
    if (check.success) {
        //  console.log(check)
        if (user) {
            if (decoded.passcode == user.passcode) {
                if (body.type == "transact") {
                    if (user.balance >= body.amount) {
                        if (decoded.merchantEmail != undefined) {
                            const merchant = await prisma.merchant.findFirst({
                                where: { email: decoded.merchantId }
                            });
                            // console.log(merchant)
                            if (merchant) {
                                const merchantBalance = merchant.balance + Number(body.amount);
                                const senderBalance = user.balance - Number(body.amount);
                                await prisma.merchant.update({
                                    where: { id: merchant.id },
                                    data: {
                                        balance: merchantBalance
                                    }
                                });
                                await prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        balance: senderBalance
                                    }
                                });
                                await prisma.transactions.create({
                                    data: {
                                        status: "Success",
                                        token: body.token,
                                        provider: "hdfc",
                                        amount: body.amount,
                                        startTime: "rnd time",
                                        userId: user.id
                                    }
                                });
                                return res.status(200).send("Transaction success");
                            }
                        }
                        else if (decoded.receiverPhone != undefined) {
                            // console.log(user)
                            // console.log('hi')
                            const receiver = await prisma.user.findFirst({
                                where: { number: decoded.receiverPhone }
                            });
                            if (receiver) {
                                if (receiver.email != user.email) {
                                    const receiverBalance = receiver.balance + Number(body.amount);
                                    const senderBalance = user.balance - Number(body.amount);
                                    await prisma.user.update({
                                        where: { id: receiver.id },
                                        data: {
                                            balance: receiverBalance
                                        }
                                    });
                                    await prisma.user.update({
                                        where: { id: user.id },
                                        data: {
                                            balance: senderBalance
                                        }
                                    });
                                    await prisma.transactions.create({
                                        data: {
                                            status: "Success",
                                            token: body.token,
                                            provider: "hdfc",
                                            amount: body.amount,
                                            startTime: "rnd time",
                                            userId: user.id
                                        }
                                    });
                                    return res.status(200).send("Transaction success");
                                }
                                else {
                                    return res.status(202).send("Sender and Receiver should be different");
                                }
                            }
                        }
                        else if (decoded.walletId != undefined) {
                            //wallet wala transaction
                            // walletId , senderId
                            const wallet = await prisma.wallet.findFirst({
                                where: { id: decoded.walletId }
                            });
                            if (wallet) {
                                const walletBalance = wallet.balance + Number(body.amount);
                                const bankBalance = user.balance - Number(body.amount);
                                await prisma.wallet.update({
                                    where: { id: decoded.walletId },
                                    data: {
                                        balance: walletBalance
                                    }
                                });
                                await prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        balance: bankBalance
                                    }
                                });
                                await prisma.transactions.create({
                                    data: {
                                        status: "Success",
                                        token: body.token,
                                        provider: "hdfc",
                                        amount: body.amount,
                                        startTime: "rnd time",
                                        userId: user.id
                                    }
                                });
                                return res.status(200).send("Wallet Transfer Success");
                            }
                        }
                    }
                    else {
                        await prisma.transactions.create({
                            data: {
                                status: "Failure",
                                token: body.token,
                                provider: "hdfc",
                                amount: body.amount,
                                startTime: "rnd time",
                                userId: user.id
                            }
                        });
                        return res.status(202).send("Not enough balance");
                    }
                }
                //here
                else {
                    //merchant deposit
                    if (decoded.merchantId != undefined) {
                        const merchant = await prisma.merchant.findFirst({
                            where: { email: decoded.merchantEmail }
                        });
                        if (merchant) {
                            const finalBalance = merchant.balance + Number(body.amount);
                            await prisma.merchant.update({
                                where: { id: merchant.id },
                                data: {
                                    balance: finalBalance
                                }
                            });
                            await prisma.transactions.create({
                                data: {
                                    status: "Success",
                                    token: body.token,
                                    provider: "hdfc",
                                    amount: body.amount,
                                    startTime: "rnd time",
                                    userId: merchant.id
                                }
                            });
                            return res.status(200).send("Deposit success");
                        }
                    }
                    else {
                        //user deposit
                        const finalBalance = user.balance + Number(body.amount);
                        await prisma.user.update({
                            where: { id: user.id },
                            data: {
                                balance: finalBalance
                            }
                        });
                        await prisma.transactions.create({
                            data: {
                                status: "Success",
                                token: body.token,
                                provider: "hdfc",
                                amount: body.amount,
                                startTime: "rnd time",
                                userId: user.id
                            }
                        });
                        return res.status(200).send("Deposit success");
                    }
                }
            }
        }
        else {
            return res.status(202).json({
                msg: "Wrong Passcode"
            });
        }
    }
    if (user) {
        await prisma.transactions.create({
            data: {
                status: "Failure",
                token: body.token,
                provider: "hdfc",
                amount: body.amount,
                startTime: "rnd time",
                userId: user.id || 0
            }
        });
        return res.status(202).send("Transaction not successful");
    }
});
app.listen(4000);
