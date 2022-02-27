import React from 'react';
import DetailsTracks from './DetailsTracks';
import './Style.css';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            musicData: [],
            sortOption: '',
            show: false,
            data: {},
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleChange(event) {
        console.log('On change', event.target.value);

        let {musicData} = this.state;
        const sortOption = event.target.value;

        if (sortOption === 'duration ascending') {
            musicData.sort((a, b) => {
                return a.duration - b.duration;
            });
        } else if (sortOption === 'duration descending') {
            musicData.sort((a, b) => {
                return b.duration - a.duration;
            });
        
        } else {
            // err
        }

        this.setState({
            sortOption,
            musicData
        });
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart')
        .then(response => response.json())
        .then(response => {
            this.setState({
                musicData: response.tracks.data,
                
            });
            console.log(response.tracks.data);

        })
        .catch(err => {console.log(err)});

    }

    handleClick(itemId) {
        
        const dataForDetails = this.state.musicData.find(element => element.id === itemId);
        const data = {
            position: dataForDetails.position,
            title: dataForDetails.title,
            artistName: dataForDetails.artist.name,
            duration: dataForDetails.duration
        };
        const show = true;

        this.setState({
            show,
            data
        });
    }

    hideModal(event) {
        this.setState({
            show: false,
        });
    }

    render() {
        const dataToDisplay = this.state.musicData;
        const displayList = dataToDisplay.map(item => 
            <li 
                title="Details"
                key={item.id}
                onClick={() => { this.handleClick(item.id) }}
            > 
            {item.title} <span style={{fontSize: 1 + 'rem'}}>by</span> {item.artist.name}
            </li>
        );

       
        return (
            <div className="container">
                <h1 className="header">Top Pop</h1>
                <div className="display">
                    <div className="gap"></div>
                    <div className="nav">
                        <span>Top Ten Songs on Deezer:</span>
                        <div className="float-right">
                            <label htmlFor="filters">Track Duration:</label>
                            <select name="filters" value={this.state.sortOption} onChange={this.handleChange}>
                                <option value="">Duration</option>
                                <option value="duration ascending">Ascending</option>
                                <option value="duration descending">Descending</option>
                            </select>
                        </div>
                    </div>
                    <ol className="list">{displayList}</ol>
                    <DetailsTracks handleClose={this.hideModal} show={this.state.show} data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default App;