import * as React from 'react'
import ReactNetworkTopology, {HostNode, NodeType} from "../lib/ReactNetworkTopology";

const testData = {
    "nodes": [
        {
            "seq": 0,
            "nodeName": "L2 S/W",
            "nodeType": NodeType.NODE_SWITCH
        },
        {
            "seq": 1,
            "nodeName": "192.168.0.31",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 2,
            "nodeName": "192.168.0.17",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 3,
            "nodeName": "192.168.0.16",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 4,
            "nodeName": "192.168.0.21",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 5,
            "nodeName": "192.168.0.11",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 6,
            "nodeName": "192.168.0.122",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 7,
            "nodeName": "192.168.0.114",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 8,
            "nodeName": "192.168.0.147",
            "nodeType": NodeType.NODE_EDGE
        },
        {
            "seq": 9,
            "nodeName": "192.168.0.1",
            "nodeType": NodeType.NODE_ROUTER
        },
        {
            "seq": 10,
            "nodeName": "192.168.1.1",
            "nodeType": NodeType.NODE_ROUTER
        },

    ],
    "links": [
        {
            "source": 0,
            "target": 1,
            "distance": 100
        },
        {
            "source": 0,
            "target": 2,
            "distance": 100
        },
        {
            "source": 0,
            "target": 3,
            "distance": 100
        },
        {
            "source": 0,
            "target": 4,
            "distance": 100
        },
        {
            "source": 0,
            "target": 5,
            "distance": 100
        },
        {
            "source": 0,
            "target": 6,
            "distance": 100
        },
        {
            "source": 0,
            "target": 7,
            "distance": 100
        },
        {
            "source": 0,
            "target": 8,
            "distance": 100
        },
        {
            "source": 0,
            "target": 9,
            "distance": 100
        },
        {
            "source": 9,
            "target": 10,
            "distance": 100
        },

    ]
};

export default class DrawTopology extends React.Component<any, any>{
    render() {
        const nodes = testData.nodes.map((node) => {
            const n = new HostNode(node.nodeName, node.seq, node.nodeType);
            n.setNodeType(node.nodeType);
            return n;
        })

        return (
            <>
                <ReactNetworkTopology
                    nodes={nodes}
                    links={testData.links}
                    width={1024}
                    height={800}
                    id={'net'}
                    onClick={(node: string) => console.log('Node clicked : '+ node)}/>
            </>
        );
    }
}
