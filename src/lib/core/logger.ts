export function logger(text = 'Notification', type = 'success') {
    import('svelte-notifications').then((svelteNotifications: any) => {
        if (!svelteNotifications?.getNotificationsContext) return;
        const notificationsContext = svelteNotifications?.getNotificationsContext();

        notificationsContext?.addNotification({
            text,
            type,
            position: 'top-center',
            removeAfter: 5000
        });
    });
}