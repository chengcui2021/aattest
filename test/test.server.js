    const chai = require('chai');
    const chaiHttp = require('chai-http');

    const should = chai.should();

    // Import server
    var server = require('../server');

    // use chaiHttp for making the actual HTTP requests   
    chai.use(chaiHttp);
    describe('User API', function() {

        it('should list ALL Users on /users GET', function(done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[1].should.have.property('name');
                    res.body[1].should.have.property('password');
                    res.body[1].should.have.property('profession');
                    done();
                });
        });

        it('should list 1 User by ID 1 on /users/:id GET', function(done) {
            chai.request(server)
                .get('/users/1')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.name.should.equal('king arthur');
                    done();
                });
        });

        it('should return rob kendal by pass rob on /searchUsersByName?filter=rob GET', function(done) {
            chai.request(server)
                .get('/searchUsersByName?filters=rob')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].name.should.equal('rob kendal');
                    done();
                });
        });
    });
