import {analyzer} from '../analysis.js';
import analysisData from './fixtures/analysis.json';

describe('Analyzer', () => {
    const analyze = analyzer(analysisData);

    it('contains bar', () => {
        const slice = analyze.resolve(45.23);
        expect(slice.bar).toEqual({
            "confidence": 0.449,
            "duration": 2.08653,
            "start": 44.15467,
        });
    });

    it('contains segment', () => {
        const slice = analyze.resolve(65.23);
        expect(slice.segment).toEqual({
            "confidence": 0.905,
            "duration": 0.26707,
            "loudness_max": -3.725,
            "loudness_max_time": 0.01437,
            "loudness_start": -17.058,
            "pitches": [
              0.595,
              1,
              0.896,
              0.523,
              0.639,
              0.31,
              0.765,
              0.464,
              0.192,
              0.114,
              0.09,
              0.738,
            ],
            "start": 64.99814,
            "timbre": [
              50.286,
              6.821,
              -43.913,
              39.383,
              -1.96,
              -63.295,
              5.155,
              -16.128,
              -5.538,
              0.972,
              -1.203,
              9.336,
            ]
        });
    });

    it('contains section', () => {
        const slice = analyze.resolve(45.23);
        expect(slice.section).toEqual({
            "confidence": 0.743,
            "duration": 34.4244,
            "key": 9,
            "key_confidence": 0,
            "loudness": -1.593,
            "mode": 1,
            "mode_confidence": 0.214,
            "start": 30.07511,
            "tempo": 115.02,
            "tempo_confidence": 0.458,
            "time_signature": 4,
            "time_signature_confidence": 0.969,
        });
    });

    it('resolves data given a time correctly', () => {
        expect(analyze.resolve(12.4).bar.start).toEqual(11.42483);
        expect(analyze.resolve(6.97092).bar.start).toEqual(6.97092);
    });

    it('resolves undefined if out of scope', () => {
        expect(analyze.resolve(500)).toEqual({
            bar: undefined
        });
    });
});
