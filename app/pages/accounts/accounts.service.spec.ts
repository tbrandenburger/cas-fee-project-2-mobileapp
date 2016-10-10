import { TestBed, async, inject } from '@angular/core/testing';
import {AccountsService} from '../../providers/accounts.service';

describe('Accounts Service', () => {

    beforeEachProviders(() => [AccountsService]);

    it('should return a non empty array', inject([AccountsService], (accountService) => {

            let result = accountService.getAnswers();

            expect(Array.isArray(result)).toBeTruthy;
            expect(result.length).toBeGreaterThan(0);
        }
    ));

    it('should return one random answer as a string', inject([AccountsService], (accountService) => {
            expect(typeof accountService.getRandomAnswer()).toBe('string');
        }
    ));

    it('should have both yes and no available in result set', inject([AccountsService], (accountService) => {

            let result = accountService.getAnswers();

            expect(result).toContain('Yes');
            expect(result).toContain('No');

        }
    ));

});