import React from 'react'
// import img from '../assests/img.svg';

const Login = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-6'>
                    {/* <img src={img}></img> */}
                </div>
                <div className="col-6 log">
                <div className="card" style={{width:'450px'}} >
                    <div className="card-body form-align">
                    <h2 className="card-title">Sign in</h2>
                        <div>
                            <form >
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="email" class="form-control" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control"  placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
