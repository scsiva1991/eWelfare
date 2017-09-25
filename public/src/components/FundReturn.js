import React, { Component } from 'react';

export default class FundReturn extends Component {
  render() {

    let {fund} = this.props;

    if( fund.status == 'FUND_REQUESTED' ) {
      return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col m2 s1"></div>
              <div className="col m8 s10 card fund-request-received-container z-depth-5">
                <h5> Your fund request received. Will be processed soon.. </h5>
              </div>
              <div className="col m2 s1"></div>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
        FR
      </div>
    )

  }
}
