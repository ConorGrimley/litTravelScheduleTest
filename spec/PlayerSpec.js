/**describe("Authenticate unsecured api post", function() {

    const api = restful('http://localhost:3000/api');
    it("No username and password", function () {
            var username = "";
            var password = "";
            api.all('authenticate')
                .post(
                    {username, password}, // Body – automatically JSON
                    null, // Params
                    null // Header
                );
        expect(response.statusCode).equals(400);
    });

    it("incorrect username and password", function () {
            var username = "Incorrect01";
            var password = "Incorrect02";
            api.all('authenticate')
                .post(
                    {username, password}, // Body – automatically JSON
                    null, // Params
                    null // Header
                );
                expect(response.statusCode).equals(401);
        });

    //Are username and password still needed to grant access? The username needs to be tied to an account that doesn't exist,
    //but then what of the password?
    it("no user found in active directory", function () {
            var username = "Incorrect01";
            var password = "Incorrect02";
            api.all('authenticate')
                .post(
                    {username, password}, // Body – automatically JSON
                    null, // Params
                    null // Header
                );
                expect(response.statusCode).equals(404);
        });

});
**/
/**
 * Created by n0313111 on 31/07/2017.
 */

// describe("Authenticate unsecured api post", function() {
//     const api = restful('http://localhost:3000/api');
//     it("No username and password", function () {
//             var username = "";
//             var password = "";
//             api.all('authenticate')
//                 .post(
//                     {username, password}, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(400);
//         }
//     );
//
//     it("incorrect username and password", function () {
//             var username = "Incorrect01";
//             var password = "Incorrect02";
//             api.all('authenticate')
//                 .post(
//                     {username, password}, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(401);
//
//     });
//
//     //Are username and password still needed to grant access? The username needs to be tied to an account that doesn't exist,
//     //but then what of the password?
//     it("no user found in active directory", function () {
//             var username = "Incorrect01";
//             var password = "Incorrect02";
//             api.all('authenticate')
//                 .post(
//                     {username, password}, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(404);
//         }
//     );
//
// })
//
//
// describe("Authenticate whether token is still valid", function() {
//     const api = restful('http://localhost:3000/api');
//     it("Check if token exists", function () {
//             api.all('check-token')
//                 .post(
//                     null, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(400);
//         });
//
// });
//
// describe("Get travel failure for a user with incorrect details", function() {
//     const api = restful('http://localhost:3000/api');
//     it("Check if incorrect details returns error", function () {
//             api.all('user-travel')
//                 .getAll(
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(400);
//         });
// });
//
// describe("Delete manually entered travel details from the database", function() {
//     const api = restful('http://localhost:3000/api');
//     it("returns error if delete travel is attempted when there is no id", function() {
//             var id = "";
//             api.all('delete-travel')
//                 .post(
//                     {id}, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(400);
//         });
//
// });
//
// it("returns error if manual travel not found", function() {
//     //need help with this one
// }
// );
//
// it("returns error if travel is not associated with the correct user ID", function() {
//     //need help with this one
// });
//
// describe("Get all LIT users (id, name) from ActiveDirectory.", function() {
//     const api = restful('http://localhost:3000/api');
//     it("returns error if password not provided", function () {
//             var username = "N0289948";
//             var password = "";
//             api.all('authenticate')
//                 .post(
//                     {username, password}, // Body – automatically JSON
//                     null, // Params
//                     null // Header
//                 );
//                 expect(response.statusCode).equals(400);
//         }
//     );
//
//     it("gives invalidCredentialsError", function () {
//         //need help with this one
//     });
// });
//
// describe("Parse uploaded Uniglobe travel log spreadsheets.", function() {
//     const api = restful('http://localhost:3000/api');
//     it("returns error if no file uploaded", function () {
//         //need help with this one
//     });
//     dF
//     it("returns error if there is a parse error", function() {
//         //need help with this one
//     });
// });
//
// describe(" import data", function() {
//     const api = restful('http://localhost:3000/api');
//     it("returns error if no file uploaded", function () {
//         //need help with this one
//     });
// });
//
// describe("delete travel file", function () {
//   const api = restful('http://localhost:3000');
//     it("returns error if id not provided", {
//         //need help with this one
//     });
//     it("retuns error if travel file not found", function () {
//
//     });
// });
//
// describe("Get airpports ", function() {
//     const api = restful('http://localhost:3000');
//     it("return successful get of airports", function() {
//
//     });
// });
//
// describe("Get hotels list", function() {
//     const api = restful('http://localhost:3000');
//     it("return successful get of hotels", function() {
//
//     });
// });


//Check a user can successfully login to the application
describe("log in and authenticate token", function () {
    const api = restful('http://localhost:3000/api');
    var username = "n0313111";
    var password = "elnino09";
    it("should log in successfully returning a status code of 200", function () {

        api.all('authenticate')
        .post(
            {username, password}, // Body – automatically JSON
            null, // Params
            null // Header
        )
        expect(response.statusCode()).toEqual("200 OK")
    });
});

//Check when a user adds travel it successfully adds with a status code of 200
describe("A user can successfully add travel", function() {
    const api = restful('http://localhost:3000/api');
    beforeAll(function (done) {
        spyOn(this, login('n0313111', 'elnino09')).and.callFake(
            function () {
                done();
            });
    })
    it("User successfully adds travel returning a 200 status", function() {
        api.all('add-travel')
            .post(
                {
                    createdBy: "N0313111",
                    destination: "kjgk",
                    endDate: "2017-08-13",
                    hasCar: false,
                    hotel: "BOSTON MARRIOTT NEWTON",
                    name: "Conor Grimley",
                    origin: "knhkh",
                    startDate: "2017-08-13"
                }, // Body – automatically JSON
                null, // Params
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
    }
        expect(response.statusCode()).toEqual("200 OK")
    )
})

//Check when a user logs in and navigates to my travel page, upcoming travel is called returning any existing travel data
describe("My travel page loaded", function () {
    const api = restful('http://localhost:3000/api');
    beforeEach(function( done ) {
        spyOn( this, login('n0313111', 'elnino09')).and.callFake(
            function(){ done(); });
    });
    it("should load page returning 304 if no data is present or 200 if data is present", function () {

        api.all('my-travel?type=upcoming')
        .getAll(
            null,
            {'Authorization': `Bearer ${getState().auth.token}`} // Header
        )
        expect(response.statusCode()=="304 Not Modified" || response.statusCode() == "200 OK").toBe(true)
    })
})

//Test the application returns the admin page successfully with the list of users that have been assigned roles
describe("fetch user roles", function () {
    const api = restful('http://localhost:3000/api');
    beforeEach(function( done ) {
        spyOn( this, login('n0313111', 'elnino09')).and.callFake(
            function(){ done(); });
    });
    api.all('user-roles')
        .getAll(
            null,
            {'Authorization': `Bearer ${getState().auth.token}`} // Header
        )
    it("Should return list of users not modified", function () {
        expect(response.statusCode()).toEqual(304)
    });
});

//Same as above test except instead of doing a restful call, uses the request package
describe("My admin page loaded", function() {
    var request = require("request");
    var base_url = "http://localhost:3000/api/user-roles";
    describe("GET /", function() {
        it("returns status code 304", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe("304 Not Modified");
                done();
            });
        });
    });
});

//Return a list of the data
describe("Get upload history", function() {
    const api = restful('http://localhost:3000/api');
    beforeEach(function( done ) {
        spyOn( this, login('n0313111', 'elnino09')).and.callFake(
            function(){ done(); });
    });
    it("Should return list of users not modified", function () {
        api.all('reports')
            .getAll(
                null,
                {
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            )
        expect(response.statusCode()).toEqual("304 Not Modified")
    })
})

//admin.js

describe("fetch / post / add users", function () {
    const api = restful('http://localhost:3000/api');
    beforeAll(function (done) {
        var password = 'elnino09'
        spyOn(this, login('n0313111', password)).and.callFake(
            function () {
                done();
            });
    });
    it("Should return dropdown list of all users giving a status code of 200", function () {
        api.all('user')
            .post(
                ({password}),
                null,
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
        expect(response.statusCode()).toEqual(200)
    });
    it("Should post a new user to the server with a return of 200 OK", function () {
        api.all('add-roles')
            .post(
                ({newRoles}),
                null,
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
        expect(response.statusCode()).toEqual(200)
    });
    it("Should update a user on the server with a return of 200 OK", function () {
        api.all('update-roles')
            .post(
                ({id, ...updatedRoles}),
                null,
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
        expect(response.statusCode()).toEqual(200)
    });
});


//myTravel
describe("MyTravel page", function () {
    const api = restful('http://localhost:3000/api');
    beforeEach(function (done) {
        var password = 'elnino09'
        spyOn(this, login('n0313111', password)).and.callFake(
            function () {
                done();
            });
    });
    it("Should delete an instance of travel and return a 200 OK status", function () {
        api.all('delete-travel')
            .post(
                ({id}),
                null,
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
        expect(response.statusCode()).toEqual(200)
    });
    it("Should return a list of travel with a 200 OK status", function () {
        api.all(`my-travel?type=${travelType}`)
            .getAll(
                null,
                {'Authorization': `Bearer ${getState().auth.token}`} // Header
            )
        expect(response.statusCode() == "200 OK" || response.statusCode() == "304 Not Modified").toBe(true)
    });
});