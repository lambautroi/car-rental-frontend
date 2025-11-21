/**
 * Utilities for handling user avatars
 */

/**
 * Default avatar as SVG data URL
 * A simple user icon in a circle
 */
export const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e0e0e0"/%3E%3Cpath d="M50 45c8.284 0 15-6.716 15-15s-6.716-15-15-15-15 6.716-15 15 6.716 15 15 15zm0 5c-13.807 0-25 8.059-25 18v7h50v-7c0-9.941-11.193-18-25-18z" fill="%23757575"/%3E%3C/svg%3E';

/**
 * Get avatar URL with fallback to default
 * @param avatarUrl - User's avatar URL (may be null or undefined)
 * @returns Valid avatar URL or default avatar
 */
export const getAvatarUrl = (avatarUrl?: string | null): string => {
    if (!avatarUrl || avatarUrl.trim() === '') {
        return DEFAULT_AVATAR;
    }
    return avatarUrl;
};

/**
 * Handle avatar load error by setting default avatar
 * @param e - Image error event
 */
export const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_AVATAR;
};
