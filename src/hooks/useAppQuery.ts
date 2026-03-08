import { siteSettings, navigationData } from '../data/globalData';
import { servicesData } from '../data/servicesData';
import { contactMethods, contactHero } from '../data/contactData';
import { homeSplits } from '../data/homeData';
import { projectsData } from '../data/projectsData';

// This is a proxy mapping for our temporary local database.
// When migrating to Supabase, this map is entirely deleted.
const localDatabaseMap: Record<string, any> = {
    'global_settings': siteSettings,
    'global_navigation': navigationData,
    'services': servicesData,
    'contact_methods': contactMethods,
    'contact_hero': contactHero,
    'home_splits': homeSplits,
    'projects': projectsData,
};

interface AppQueryResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

/**
 * useAppQuery
 * Returns local data synchronously to avoid layout shifts and render delays.
 *
 * Future Supabase Migration:
 * Replace with async fetch using useState/useEffect:
 * const { data, error } = await supabase.from(tableName).select();
 */
export function useAppQuery<T = any>(tableName: string): AppQueryResponse<T> {
    const result = localDatabaseMap[tableName];

    if (!result) {
        return {
            data: null,
            isLoading: false,
            error: new Error(`Table ${tableName} not found in database.`),
        };
    }

    return {
        data: result as T,
        isLoading: false,
        error: null,
    };
}
