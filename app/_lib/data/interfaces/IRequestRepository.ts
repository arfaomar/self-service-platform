import { Request } from "@lib/data/entities/Request";

export interface IRequestRepository {
    createRequest(request: Request): Promise<Request>;
    getRequestById(id: number): Promise<Request>;
    getAllRequestsByUserId(userId: string, orgId: string): Promise<Request[]>;
    getAllRequestsByOrganizationId(orgId: string): Promise<Request[]>;
    updateRequest(request: Request): Promise<Request>;
    deleteRequest(id: number): Promise<boolean>;
}
