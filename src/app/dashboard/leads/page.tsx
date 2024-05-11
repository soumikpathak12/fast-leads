'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState, useEffect } from 'react'
import { app } from "../../firebaseConfig"
import { deleteField, getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil } from 'lucide-react'
function page() {

    const [leadData, setLeadData] = useState<Object[]>([]);
    const [editForm, setEditForm] = useState({ name: '', number: '', business: '', id: '' })
    const [open, setOpen] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);
    useEffect(() => {
        fetchLeadsData();
    }, [leadData]);
    async function fetchLeadsData() {
        const querySnapshot = await getDocs(collection(db, "leads"));
        const data: Object[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        })
        setLeadData(data)
    }

    const createLead = async (e: any) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget);
        // const test= formdata.get('name');      
        const data = Object.fromEntries(formdata)
        console.log(data)

        try {
            const docRef = await addDoc(collection(db, "leads"), data);
            fetchLeadsData();
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const editLead = (id: any, index: number, data: any) => {
        setEditForm(data)
        setOpen(true);
    }

    const submitEditedLead = async (e: any) => {
        e.preventDefault()
        console.log(editForm, editForm.id)
        const userRef = doc(db, "leads", editForm.id);
        await updateDoc(userRef, {
            business: editForm.business,
            name: editForm.name,
            number: editForm.number,
            // test: deleteField()
        });
        // fetchLeadsData();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setEditForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    return (
        <div className='text-right px-10 py-4'>
            <Dialog >
                <DialogTrigger asChild>
                    <Button >Create Leads</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={createLead}>
                        <DialogHeader>
                            <div className='py-4'>
                                <DialogTitle className='text-center'>Add New Lead</DialogTitle>
                            </div>
                            {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Number
                                </Label>
                                <Input
                                    type="number"
                                    name="number"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Business Name
                                </Label>
                                <Input
                                    type="text"
                                    name="business"
                                    className="col-span-3"
                                />
                            </div>

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" >Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className='py-4'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lead Name</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Business Name</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-left'>
                        {leadData.map((data: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{data.name}</TableCell>
                                <TableCell className="font-medium">{data.number}</TableCell>
                                <TableCell className="font-medium">{data.business}</TableCell>
                                <TableCell><Pencil className="cursor-pointer" size={20} color="#2e70db" onClick={() => editLead(data.id, index, data)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={submitEditedLead}>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    className="col-span-3"
                                    value={editForm.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Number
                                </Label>
                                <Input
                                    type="number"
                                    name="number"
                                    className="col-span-3"
                                    value={editForm.number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-left">
                                    Business Name
                                </Label>
                                <Input
                                    type="text"
                                    name="business"
                                    className="col-span-3"
                                    value={editForm.business}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">Update</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default page