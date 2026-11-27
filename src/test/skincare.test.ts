import { describe, expect, it } from 'vitest';
import { profiles, resolveConcern, validatePhoto } from '@/features/skincare/data';
describe('Skincare simulation rules',()=>{
 it('Demo 1 maps to the inflammatory acne profile',()=>{expect(profiles[resolveConcern('inflammatory')].title).toBe('Inflammatory Acne');});
 it('Demo 2 maps to the moderate breakouts profile',()=>{expect(profiles[resolveConcern('moderate')].title).toBe('Moderate Breakouts');});
 it('Demo 3 maps to the blackheads profile',()=>{expect(profiles[resolveConcern('blackheads')].title).toBe('Blackheads and Comedones');});
 it('custom uploads default to general demonstration guidance',()=>{expect(resolveConcern(null)).toBe('general');});
 it('custom uploads follow the selected concern instead of image recognition',()=>{expect(resolveConcern(null,'oily')).toBe('oily');});
 it('a demo overrides a custom concern',()=>{expect(resolveConcern('moderate','oily')).toBe('moderate');});
 it('recommends benzoyl peroxide 2.5% only for the inflammatory example',()=>{expect(profiles.inflammatory.products).toContain('benzoyl');expect(profiles.moderate.products).not.toContain('benzoyl');});
 it('recommends salicylic acid for moderate breakouts and blackheads',()=>{expect(profiles.moderate.products).toContain('salicylic');expect(profiles.blackheads.products).toContain('salicylic');});
 it('includes SPF 30 or higher in the morning routine',()=>{expect(profiles.inflammatory.morning[2]).toContain('SPF 30 or higher');});
 it('accepts JPG, PNG, and WEBP photos',()=>{for(const type of ['image/jpeg','image/png','image/webp'])expect(validatePhoto({type,size:1000})).toBeNull();});
 it('rejects non-photo files',()=>{expect(validatePhoto({type:'application/pdf',size:1000})).not.toBeNull();});
});
