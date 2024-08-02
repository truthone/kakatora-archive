import { useMemo } from 'react';
import imageMetadata from '../data/imageMetadata.json';

export function useNormalizedImage(folder, fileName) {
  return useMemo(() => {
    const normalizedKey = fileName.normalize('NFC');
    const metadata = imageMetadata[folder]?.[normalizedKey];

    if (!metadata) {
      console.error(`Metadata not found for ${folder}/${fileName}`);
      return null;
    }

    const { originalName, path } = metadata;
    const src = `/api/image?path=${encodeURIComponent(path)}`;
    const title = normalizedKey.split('.').slice(0, -1).join('.');

    return { src, title, originalName };
  }, [folder, fileName]);
}