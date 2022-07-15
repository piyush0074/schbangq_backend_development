

export default {

    port: parseInt(process.env.PORT, 10) || 8080,
    host: /*process.env.HOST ||*/ 'localhost',

    logs: {
        level:  'silly',
    },


    api: {
        prefix: '/api',
    },

    jwtSecret: 'AoTgab%$SKBJB(Baco&euro$!(*^%fcxuartcuYCAvhagA)Y^VYcdw(TVYCtxt@ibs)a%Wbha5$',

    jwtAlgorithm:  'HS256',

    DatabaseURL: 'mongodb://localhost:27017/schbangq',

    CouponCode: "FIRSTBOOK",
    CouponDiscount: 30,

    Key: "074e48c8e3c0bc19f9e22dd7570037392e5d0bf80cf9dd51bb7808872a511b3c1cd91053fca873a4cb7b2549ec1010a9a1a4c2a6aceead9d115eb9d60a1630e056f3accb10574cd563371296d4e4e898941231d06d8dd5de35690c4ba94ca12729aa316365145f8a00c410a859c40a46bbb4d5d51995241eec8f6b7a90415e074e48c8e3c0bc19f9e22dd7570037392e5d0bf80cf9dd51bb7808872a511b3c1cd91053fca873a4cb7b2549ec1010a9a1a4c2a6aceead9d115eb9d60a1630e056f3accb10574cd563371296d4e4e898941231d06d8dd5de35690c4ba94ca12729aa316365145f8a00c410a859c40a46bbb4d5d51995241eec8f6b7a90415e",

    Iv: "074e48c8e3c0bc19f9e22dd7570037392e5d0bf80cf9dd51bb7808872a511b3c1cd91053fca873a4cb7b2549ec1010a9a1a4c2a6aceead9d115eb9d60a1630e056f3accb10574cd563371296d4e4e898941231d06d8dd5de35690c4ba94ca12729aa316365145f8a00c410a859c40a46bbb4d5d51995241eec8f6b7a90415e",
}