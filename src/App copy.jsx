import { useState } from 'react'
import { createColumnHelper, flexRender, useReactTable } from '@tanstack/react-table'
import mockData from './constants/data.json'
import { Mail, Phone, User } from 'lucide-react'


const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor('id', {
		cell: (info) => (info.getValue()),
		header: ()=> (
			<span className='flex items-center'>
				<User className='mr-2' size={16}/> ID 
			</span>
		),
	}),
	columnHelper.accessor('name', {
		cell: (info) => (info.getValue()),
		header: ()=> (
			<span className='flex items-center'>
				<User className='mr-2' size={16}/> Name 
			</span>
		),
	}),
	columnHelper.accessor('email', {
		id: 'email',
		cell: (info) => (
			<span className='italic text-blue-600'>{info.getValue()}</span>
		),
		header: ()=> (
			<span className='flex items-center'>
				<Mail className='mr-2' size={16}/> Email 
			</span>
		),
	}),
	columnHelper.accessor('phone', {
		cell: (info) => (info.getValue()),
		header: ()=> (
			<span className='flex items-center'>
				<Phone className='mr-2' size={16}/> Phone 
			</span>
		),
	}),
]


function App() {

	const [data] = useState(()=>[...mockData])
	const table = useReactTable({
		data: data,
		columns: columns
	})

	// console.log(table.getRowModel())

	return (
		<div className='flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4'>
			<div className='overflow-x-auto bg-white shadow-md rounded-lg'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						{
							table.getHeaderGroups().map((headerGroup)=>(
								<tr key={headerGroup.id}>
									{
										headerGroup.headers.map((header)=>(
											<th 
												key={header.id}
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												<div>
													{
														flexRender(
															header.column.columnDef.header,
															header.getContext()
														)
													}
												</div>
											</th>
										))
									}
								</tr>
							))
						}
					</thead>
					<tbody>
						{
							table.getRowModel().rows.map((row)=>(
								<tr key={row.id}>

								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default App
