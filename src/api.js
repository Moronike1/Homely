const API_URL = import.meta.env.VITE_API_URL;

export const getProperties = async () => {
    try {
        const response = await fetch(`${API_URL}/properties`);
        if (!response.ok) {
            throw new Error("Failed to fetch properties");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};
