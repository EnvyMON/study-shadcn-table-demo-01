import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import DATA from '../data';

// const DATA = [
// 	{
// 	  task: "Add a New Feature",
// 	  status: STATUS_ON_DECK,
// 	  due: new Date("2023/10/15"),
// 	  notes: "This is a note",
// 	},

const colums = [
	{
		accessorKey: 'tack',
		header: 'Task',
		cell: (props)=>{
			return <p>{props.getValue()}</p>
		}
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (props)=>{
			return <p>{props.getValue()}</p>
		}
	},
	{
		accessorKey: 'due',
		header: 'Due',
		cell: (props)=>{
			return <p>{props.getValue()}</p>
		}
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: (props)=>{
			return <p>{props.getValue()}</p>
		}
	}
]

const TaskTables = () => {
	const [data, setData] = useState(DATA);
	const table = useReactTable({
		data,
		colums,
		getCoreRowModel: getCoreRowModel()
	});

	console.log(table.getHeaderGroups());

	return (
		<div>
			<div className='table'>
				{
					table.getHeaderGroups().map()
				}
			</div>
		</div>
	)
}

export default TaskTables