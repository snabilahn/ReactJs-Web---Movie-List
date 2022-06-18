import React, { useContext, useEffect, useState } from 'react';
import { Layout, Typography, Button, Table, message, Divider, Collapse, Row, Col } from 'antd';
import '../assets/style/style.css'
import { MovieContext } from '../context/MovieContext';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import axios from "axios"

const GameList = () => {
    const { Content } = Layout;
    const { Title } = Typography;
    const { Panel } = Collapse;

    let history = useHistory()

    const { dataGame ,fetchStatus, setFetchStatus, functions, setDataGame } = useContext(MovieContext);
    const {fetchDataGame} = functions;

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState({
      release: "",
      genre: "",
      platform: ""
    })

    useEffect(() => {

        if(fetchStatus) {
            fetchDataGame();
            setFetchStatus(false);
        }

    }, [fetchStatus, setFetchStatus])

    const handleEdit = (event) => {
        let idGame = parseInt(event.currentTarget.value)
        console.log(idGame);
        history.push(`/game/edit/${idGame}`)
    }

    const handleDelete = (event) => {
        let idGame = parseInt(event.currentTarget.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {
          headers: {
            "Authorization": "Bearer " + Cookies.get('token')
          }
        })
            .then(() => {
              console.log(idGame)
              message.success('Game Deleted!');
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length
        },
        {
          title: 'Release Year',
          dataIndex: 'release',
          key: 'release',
          sorter: {
            compare: (a, b) => a.release - b.release,
          },
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => a.genre.length - b.genre.length
        },
        {
          title: 'Platform',
          dataIndex: 'platform',
          key: 'platform',
          sorter: {
            compare: (a, b) => a.platform - b.platform,
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

      const data = dataGame

      const onChangeSearch = (event) => {
        let value = event.target.value
        setSearch(value)
      }

      const handleSearch = (event) => {
        event.preventDefault()

        let searchData = async () => {
          let {data} = await axios.get('https://backendexample.sanbersy.com/api/data-game');

          let searchOnData = data.filter((res) => {
            return Object.values(res).join(' ').toLowerCase().includes(search.toLowerCase())
          })

          setDataGame([...searchOnData])
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

        let {release, genre, platform} = filter
        let filterData = async () => {
          let {data} = await axios.get('https://backendexample.sanbersy.com/api/data-game');

          let filterOnData = data.filter((res) => {
            return res.release === release || res.genre === genre || res.platform === platform
           })

          setDataGame([...filterOnData])
        }

        filterData()
        setFilter({
          release: "",
          genre: "",
          platform: ""
        })
      }

    return(
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <div className="site-card-border-less-wrapper">
                    <Divider orientation="left">Search & Filter</Divider>
                        <Collapse defaultActiveKey={['1']} >

                          <Panel header="Search Game" key="1">
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

                          <Panel header="Filter Game" key="2">
                            <form onSubmit={handleFilter}>
                              <Row>
                              <Col style={{marginRight: "2%", width: "32%"}}>
                              <input 
                                type="text" 
                                name="release" 
                                value={filter.release} 
                                placeholder="Release Year..." 
                                onChange={onChangeFilter}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                                required
                              />
                              </Col>
                              <Col style={{marginRight: "2%", width: "32%"}}>
                              <input 
                                type="text" 
                                name="genre" 
                                value={filter.genre} 
                                placeholder="Genre..." 
                                onChange={onChangeFilter}
                                style={{marginBottom: "2%", border: "1px solid grey"}}
                                required
                              />
                              </Col>
                              <Col style={{width: "32%"}}>
                              <input 
                                type="text" 
                                name="platform" 
                                value={filter.platform} 
                                placeholder="Platform..." 
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

                        <Divider orientation="left">Data Game</Divider>
                        <div className="container_table">
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default GameList;