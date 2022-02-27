import React from 'react';

class DetailsTracks extends React.Component {

    secToMin = (duration) => {
        const mins = Math.floor(duration / 60);
        const sec = duration % 60;
        return ('' + mins + ':' + (sec < 10 ? ('0' + sec) : sec));
    };

    closeDetails = (event) => {
        const modal = document.getElementById('modalDetails');
        if (event.target === modal) {
            this.props.handleClose();
        }
    };

    render() {

        const { handleClose, show, data } = this.props;
        const showHideClassName = show ? 'showDetails' : 'hideDetails';

        return (
            <div className={showHideClassName}>
                <div id="modalDetails" className="modal" onClick={this.handleBackgroundClose}>
                    <div className="DetailsM">
                        <span className="closeDetails"  onClick={handleClose}>&times;</span>
                        <h1 className="detailsTitle">Details</h1>
                        <div>
                            <div>
                                <p>Rank on Deezer: {data.position}</p>
                                <p>Name: {data.title}</p>
                                <p>Artist: {data.artistName}</p>
                                <p>Duration: {this.secToMin(data.duration)}</p>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        );
    }
}

export default DetailsTracks;