import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button, Table, message, Divider, Collapse, Row, Col } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import axios from "axios"

const MovieList = () => {
    const { Content } = Layout;

    let history = useHistory()
    let [isSpinning, setIsSpinning] = useState(true);

    const { Panel } = Collapse;

    const { dataMovie ,fetchStatus, setFetchStatus, functions, setDataMovie } = useContext(MovieContext);
    const {fetchDataMovie} = functions;
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState({
      rating: "",
      year: "",
      duration: ""
    })

    useEffect(() => {

        if(fetchStatus) {
            fetchDataMovie();
            setFetchStatus(false);
        }

    }, [fetchStatus, setFetchStatus])

    const handleEdit = (event) => {
        let idMovie = parseInt(event.currentTarget.value)
        history.push(`/movie/edit/${idMovie}`)
    }

    const handleDelete = (event) => {
      let idMovie = parseInt(event.currentTarget.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {
          headers: {
            "Authorization": "Bearer " + Cookies.get('token')
          }
        })
            .then(() => {
              message.success('Movie Deleted!');
              setFetchStatus(true)
            })
    }

    const columns = [
        {
          title: 'Image',
          dataIndex: 'image_url',
          key: 'image_url',
          render: res => <img width={100} height={100} style={{objectFit: "cover"}} src={res}/>
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => a.title.length - b.title.length
        },
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
          sorter: {
            compare: (a, b) => a.year - b.year,
          },
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => a.genre.length - b.genre.length
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          key: 'duration',
          sorter: {
            compare: (a, b) => a.duration - b.duration,
          },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: {
              compare: (a, b) => a.rating - b.rating,
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (res, index) => (

                <div>
                    <Button onClick={handleEdit} value={res.id}><EditOutlined /></Button>
                    <Button icon={<DeleteFilled />} onClick={handleDelete} value={res.id}></Button>
                </div>
            ),
        },

      ];

      const data = dataMovie

      const onChangeSearch = (event) => {
        let value = event.target.value
        setSearch(value)
      }

      const handleSearch = (event) => {
        event.preventDefault()

        let searchData = async () => {
          let {data} = await axios.get('https://backendexample.sanbersy.com/api/data-movie');

          let searchOnData = data.filter((res) => {
            return Object.values(res).join(' ').toLowerCase().includes(search.toLowerCase())
          })

          setDataMovie([...searchOnData])
        }

        searchData()
        setSearch("")
      }

      const onChangeFilter = (event) => {
        let {value, name} = event.target
        setFilter({...filter, [name]: value})
      }

      const handleFilter = (event) => {
        event.preventDefault()

        let {rating, duration, year} = filter
        let filterData = async () => {
          let {data} = await axios.get('https://backendexample.sanbersy.com/api/data-movie');

          let filterOnData = data.filter((res) => {
            return res.rating === parseInt(rating) || res.year === parseInt(year) || res.year === parseInt(duration)
           })

          setDataMovie([...filterOnData])
        }

        filterData()
        setFilter({
          rating: "",
          year: "",
          duration: ""
        })
      }

    return(
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <div className="site-card-border-less-wrapper">
                        <Divider orientation="left">Search & Filter</Divider>
                        <Collapse defaultActiveKey={['1']} >

                          <Panel header="Search Movie" key="1">
                            <form onSubmit={handleSearch}>
                              <input 
                                type="text" 
                                name="search" 
                                value={search} 
                                placeholder="Search..." 
                                onChange={onChangeSearch}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                              />
                              <input type="submit" value="Search"/>
                            </form>
                          </Panel>

                          <Panel header="Filter Movie" key="2">
                            <form onSubmit={handleFilter}>
                            <Row>
                              <Col style={{marginRight: "2%", width: "32%"}}>
                              <input 
                                type="text" 
                                name="year" 
                                value={filter.year} 
                                placeholder="Year..." 
                                onChange={onChangeFilter}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                                required
                              />
                              </Col>
                              <Col style={{marginRight: "2%", width: "32%"}}>
                              <input 
                                type="text" 
                                name="rating" 
                                value={filter.rating} 
                                placeholder="Rating..." 
                                onChange={onChangeFilter}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                                required
                              />
                              </Col>
                              <Col style={{width: "32%"}}>
                              <input 
                                type="text" 
                                name="duration" 
                                value={filter.duration} 
                                placeholder="Duration..." 
                                onChange={onChangeFilter}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                                required
                              />
                              </Col>
                              <input type="submit" value="Filter" style={{marginTop: "2%"}}/>
                              </Row>
                            </form>
                          </Panel>
                        </Collapse>
                        <br/>
                        <Button type='primary' onClick={() => {
                          setFetchStatus(true)
                        }}>Reset Filter</Button>

                        <Divider orientation="left">Data Movie</Divider>
                        <div className="container_table">
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default MovieList;