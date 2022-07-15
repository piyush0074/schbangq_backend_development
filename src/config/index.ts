

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

}