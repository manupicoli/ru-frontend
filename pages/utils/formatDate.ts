export function formatDate(date?: Date): string {
    if (!date) {
        return 'Data não disponível';
    }
    const updatedDate = typeof date === 'string' ? new Date(date) : date;
    const localDate = new Date(updatedDate.getTime() + updatedDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}