import { IRequestRepository } from "../interfaces/IRequestRepository";
import { Request } from "@lib/data/entities";
import { db, request } from "../../../../db";
import { eq, and, count } from "drizzle-orm";

export class RequestRepository implements IRequestRepository {
    async createRequest(requestData: Request): Promise<Request> {
        // Insert the new Request into the database
        const [createdRequest] = await db
            .insert(request)
            .values(requestData)
            .returning();
        return createdRequest; // Returns the created Request object
    }

    async getRequestById(id: number): Promise<Request> {
        const foundRequest = await db
            .select()
            .from(request)
            .where(eq(request.id, id));

        if (foundRequest.length === 0) {
            throw new Error("Request not found");
        }
        return foundRequest[0]; // Returns the found Request object
    }

    async getAllRequestsByUserId(
        userId: string,
        orgId: string,
    ): Promise<Request[]> {
        const foundRequests = await db
            .select()
            .from(request)
            .where(
                and(
                    eq(request.userId, userId),
                    eq(request.organizationId, orgId),
                ),
            );

        return foundRequests; // Returns an array of Requests
    }

    async getAllRequestsByOrganizationId(orgId: string): Promise<Request[]> {
        const foundRequests = await db
            .select()
            .from(request)
            .where(eq(request.organizationId, orgId));

        return foundRequests; // Returns an array of Requests
    }

    async updateRequest(requestData: Request): Promise<Request> {
        const updatedRequest = await db
            .update(request)
            .set({
                userId: requestData.userId,
                status: requestData.status,
                creationDate: requestData.creationDate,
                organizationId: requestData.organizationId,
                updateDate: requestData.updateDate,
            })
            .where(eq(request.id, requestData.id))
            .returning();

        if (updatedRequest.length === 0) {
            throw new Error("Request not found for update");
        }
        return updatedRequest[0]; // Returns the updated Request object
    }

    async deleteRequest(id: number): Promise<boolean> {
        const deletedRequest = await db
            .delete(request)
            .where(eq(request.id, id));

        return deletedRequest.count > 0; // Returns true if the Request was successfully deleted, else false
    }
}
