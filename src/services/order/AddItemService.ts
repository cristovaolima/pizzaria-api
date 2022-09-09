import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: String;
    product_id: String;
    amount: Number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {
        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            }
        });
        return item;
    }
}

export { AddItemService };