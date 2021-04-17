import {SimulationLinkDatum, SimulationNodeDatum } from "d3";
import * as React from 'react'
import './rnt.css';

const d3 = Object.assign({}, require('d3-selection'), require('d3-force'), require('d3-drag'));

export enum NodeType{
    NODE_EDGE='NODE_EDGE',
    NODE_ROUTER='NODE_ROUTER',
    NODE_SWITCH='NODE_SWITCH',
    NODE_UNKNOWN='NODE_UNKNOWN',
}

let iconSize = 10;

export class HostNode implements SimulationNodeDatum{
    nodeName : string = 'unknown';
    nodeType : NodeType = NodeType.NODE_UNKNOWN;

    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    constructor(name: string, idx: number, type: NodeType) {
        this.nodeName = name;
        this.index = idx;
        this.nodeType = type;
    }

    setNodeType(type: NodeType){
        this.nodeType = type;
    }
}

export class HostLink implements SimulationLinkDatum<SimulationNodeDatum>{
    source: number = 0;
    target: number = 0;
    distance: number = 100;
}

function tick(){
    d3.selectAll(".link")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

    d3.selectAll(".circle")
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

    d3.selectAll(".rect")
        .attr("x", (d: any) => d.x - iconSize * 1.5)
        .attr("y", (d: any) => d.y - iconSize);

    d3.selectAll(".text")
        .attr("x", (d: any) => d.x - 25)
        .attr("y", (d: any) => d.y + 20);
}

function clamp(x:number, lo:number, hi:number) {
    return x < lo ? lo : x > hi ? hi : x;
}

function drawTopology(props: NodeLink){
    const {id, nodes, links, width, height, onClick} = props;

    const svg = d3.select(`#${id}`);

    const edges = [];
    const routers = [];
    const switches = [];

    for (const node of nodes){
        switch (node.nodeType){
            case NodeType.NODE_EDGE:
                edges.push(node);
                break;
            case NodeType.NODE_ROUTER:
                routers.push(node);
                break;
            case NodeType.NODE_SWITCH:
                switches.push(node);
                break;
            case NodeType.NODE_UNKNOWN:
                break;
        }
    }

    svg
        .selectAll(".link")
        .data(links)
        .join("line")
        .classed("link", true);


    const t1: any = svg
        .selectAll("g1")
        .data(edges).enter()
        .append("g");
    t1
        .append("circle")
        .attr("r", iconSize)
        .attr("class", "circle")
        .classed("node edge", true);
    t1
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d: HostNode) { return d.nodeName })
        .classed("node text", true);


    const t2: any = svg
        .selectAll("g2")
        .data(routers).enter()
        .append("g");
    t2
        .append("rect")
        .attr("width", iconSize * 3)
        .attr("height", iconSize * 1.5)
        .attr("class", "rect")
        .classed("node router", true);
    t2
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d: HostNode) { return d.nodeName })
        .classed("node text", true);

    const t3: any = svg
        .selectAll("g3")
        .data(switches).enter()
        .append("g");
    t3
        .append("rect")
        .attr("width", iconSize * 3)
        .attr("height", iconSize * 1.5)
        .attr("class", "rect")
        .classed("node switch", true);
    t3
        .append('text')
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d: HostNode) { return d.nodeName })
        .classed("node text", true)


    const simulation = d3
        .forceSimulation()
        .nodes(nodes)
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("link", d3.forceLink(links)
            .distance(function(d: HostLink) {return d.distance})
        )
        .on("tick", tick);

    const drag = d3
        .drag()
        .on("drag", function (event: any, d: any) {
            d.fx = clamp(event.x, 0, width);
            d.fy = clamp(event.y, 0, height);
            simulation.alpha(1).restart();
        });

    t1
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (onClick !== undefined) onClick(d.nodeName);
        });

    t2
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (onClick !== undefined) onClick(d.nodeName);
        });

    t3
        .call(drag)
        .on("click", function (event: any, d: HostNode) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(1).restart();
            if (onClick !== undefined) onClick(d.nodeName);
        });

}

interface NodeLink {
    nodes: HostNode[];
    links: HostLink[];
    width: number;
    height: number;
    id: string;
    size?: number;
    onClick?: (host: string)=>void;
}

export default class ReactNetworkTopology extends React.Component<NodeLink>{

    render(){
        const {width, height, id} = this.props;
        return (
            <svg id={id} width={width} height={height}/>
        );
    }

    componentDidMount() {
        iconSize = (this.props.size === undefined) ? 10 : this.props.size;
        drawTopology(this.props);
    }

    componentDidUpdate(prevProps: Readonly<NodeLink>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.size !== this.props.size){
            iconSize = (this.props.size === undefined) ? 10 : this.props.size;
        }

        drawTopology(this.props);
    }
}
