import 'dotenv/config';
import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';
import { eachLike, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import { userList } from '../../lib/request/user.request'
import {expect} from '@jest/globals';

const mockProvider = new Pact({
    consumer: 'ebac-demo-store-admin',
    provider: 'ebac-demo-store-server',
    port: 4432,
    log: resolve(process.cwd(), 'logs', 'pact.log'),
    dir: resolve(process.cwd(), 'pacts')
});

describe('(ContractConsumer) Consumer Login Test', () => {
    beforeAll(async () => {
        await mockProvider.setup().then(() => {
            mockProvider.addInteraction({
                uponReceiving: 'A request for user login',
                withRequest: {
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4Njk4MzI1LCJleHAiOjE2OTg4NzExMjV9.bKD0vRYhUCCOlleczKjgrl1EXPqvQ4ZyHmEOkUJaR34',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        "operationName": "users",
                        "variables": {
                            "where": {},
                            "take": 50,
                            "skip": 0,
                            "orderBy": {
                                "id": "Asc"
                            }
                        },
                        "query": "query users($orderBy: UserOrderByInput, $skip: Float, $take: Float, $where: UserWhereInput) {\n  items: users(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {\n    createdAt\n    firstName\n    id\n    lastName\n    roles\n    updatedAt\n    username\n    __typename\n  }\n  total: _usersMeta(where: $where) {\n    count\n    __typename\n  }\n}\n"
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: {
                        "data": {
                            "items": eachLike(
                                {
                                    "createdAt": somethingLike("2023-10-29T20:52:04.821Z"),
                                    "firstName": somethingLike("Admin"),
                                    "id": somethingLike("cloby5qol0000u65ss2vy6qnj"),
                                    "lastName": somethingLike("User"),
                                    "roles": [
                                        "user"
                                    ],
                                    "updatedAt": somethingLike("2023-10-29T20:52:04.849Z"),
                                    "username": somethingLike("admin"),
                                    "__typename": somethingLike("User")
                                },
                                { min: 2}
                            ),
                            "total": {
                                "count": "2",
                                "__typename": "MetaQueryPayload"
                            }
                        }
                    }
                }
            })
        })
    });

    afterAll(() => {
        mockProvider.finalize();
    });

    afterEach(() => {
        mockProvider.verify();
    });

    it('Should return the user list', async () => {
        await userList().then(response => {
            console.log('response: ' + response);
            const { firstName, lastName } = response.data.data.items[1]

            expect(response.status).toEqual(200);
            expect(firstName).toEqual("admin");
            expect(lastName).toEqual('User');
        })
    })
});
