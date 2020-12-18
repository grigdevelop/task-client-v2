import 'jest';
import { AuthService } from '../../services';
import { DT_User, Repository } from './repository';
import { TestAuthService } from './testServiceStore';

describe('testing local mock services', () => {

    let authService: AuthService;
    const dbUsers: DT_User[] = [];

    beforeEach(() => {
        dbUsers.splice(0);
        authService = new TestAuthService(new Repository(dbUsers));
    });

    it('should login the user', async () => {
        // arrange
        dbUsers.push({
            id: 1,
            username: 'test user',
            password: 'test_password'
        });

        // act
        let response = await authService.login({ username: 'test user', password: 'test_password' });

        // assert
        expect(response.success).toBeTruthy();
        expect(response.data?.userInfo.username).toBe('test user');
    });

    it('should warn "user not found"', async () => {
        // arrange

        // act
        let response = await authService.login({ username: 'test user', password: 'test_password' });

        // assert
        expect(response.success).toBeFalsy();
        expect(response.error?.type).toBe('form');
        switch (response.error?.type) {
            case 'form':
                expect(response.error.formErrors['username']).toBe('User not found.');
        }
    });


    it('should warn "invalid password"', async () => {
        // arrange
        dbUsers.push({
            id: 1,
            username: 'test user',
            password: 'test_password'
        });

        // act
        let response = await authService.login({ username: 'test user', password: 'invalid_password' });

        // assert
        expect(response.success).toBeFalsy();
        expect(response.error?.type).toBe('form');
        switch (response.error?.type) {
            case 'form':
                expect(response.error.formErrors['password']).toBe('Invalid password.');
        }
    });
});