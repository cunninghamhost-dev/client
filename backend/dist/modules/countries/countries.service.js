import prisma from "../../lib/prisma.js";
export const getCountries = async () => {
    return prisma.country.findMany();
};
//# sourceMappingURL=countries.service.js.map