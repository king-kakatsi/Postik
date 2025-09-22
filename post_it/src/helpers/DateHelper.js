

// %%%%%%%%%%% GET DATE FORMAT %%%%%%%%%%%%%%
export function getFullDate(date) {
    // Convert if date doesn't have the good format
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
        throw new Error('Date invalide');
    }

    const options = {
        weekday: "long",
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(dateObj);
}
// %%%%%%%%%%% END - GET DATE FORMAT %%%%%%%%%%%%%%
