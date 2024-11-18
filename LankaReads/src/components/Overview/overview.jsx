import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Overview.css';
import { FaUsers, FaBook, FaStore, FaPenNib } from 'react-icons/fa';

function Overview() {
    return (
        <div className="container-fluid my-5">
            <div className="row text-center">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <FaUsers size={40} className="text-orange mb-3" />
                    <h3>125,663</h3>
                    <p>Happy Customers</p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <FaBook size={40} className="text-orange mb-3" />
                    <h3>50,672</h3>
                    <p>Book Collections</p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <FaStore size={40} className="text-orange mb-3" />
                    <h3>1,562</h3>
                    <p>Our Stores</p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <FaPenNib size={40} className="text-orange mb-3" />
                    <h3>475</h3>
                    <p>Famous Writers</p>
                </div>
            </div>
        </div>
    );
}

export default Overview;
