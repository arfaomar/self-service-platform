export function getBadgeVariant(
    status: string,
): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case "Open":
            return "default";
        case "Closed":
            return "outline";
        case "On Hold":
            return "destructive";
        case "In Progress":
            return "secondary";
        default:
            return "outline";
    }
}

export function formatDate(date: Date): string {
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}
