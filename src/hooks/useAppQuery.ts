import { useState, useEffect } from 'react';
import { siteSettings, navigationData, socialLinks } from '../data/globalData';
import { servicesData } from '../data/servicesData';
import { contactMethods, contactHero } from '../data/contactData';
import { homeSplits } from '../data/homeData';

// This is a proxy mapping for our temporary local database.
// When migrating to Supabase, this map is entirely deleted.
const localDatabaseMap: Record<string, any> = {
    'global_settings': siteSettings,
    'global_navigation': navigationData,
    'global_socials': socialLinks,
    'services': servicesData,
    'contact_methods': contactMethods,
    'contact_hero': contactHero,
    'home_splits': homeSplits,
};

interface AppQueryResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

/**
 * useAppQuery 
 * A generic hook that simulates an asynchronous database fetch (like Supabase).
 * 
 * Future Supabase Migration:
 * Replace the setTimeout logic below with:
 * const { data, error } = await supabase.from(tableName).select();
 */
export function useAppQuery<T = any>(tableName: string): AppQueryResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Simulate network latency (250ms)
                await new Promise(resolve => setTimeout(resolve, 250));

                const result = localDatabaseMap[tableName];
                if (!result) throw new Error(`Table ${tableName} not found in database.`);

                if (isMounted) {
                    setData(result as T);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Unknown error occurred'));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [tableName]);

    return { data, isLoading, error };
}
