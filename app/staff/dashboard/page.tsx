"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, Users, Calendar, AlertTriangle, Search, Bell, LogOut, Plus, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "staff" && parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock data
  const pendingRequests = [
    {
      id: 1,
      bookTitle: "Harry Potter and the Sorcerer's Stone",
      readerName: "John Doe",
      readerEmail: "john.doe@example.com",
      requestDate: "2024-01-05",
      status: "pending",
    },
    {
      id: 2,
      bookTitle: "The Great Gatsby",
      readerName: "Jane Smith",
      readerEmail: "jane.smith@example.com",
      requestDate: "2024-01-06",
      status: "pending",
    },
  ]

  const overdueBooks = [
    {
      id: 1,
      bookTitle: "1984",
      readerName: "Bob Johnson",
      dueDate: "2024-01-01",
      daysOverdue: 4,
      fine: 8.0,
    },
    {
      id: 2,
      bookTitle: "To Kill a Mockingbird",
      readerName: "Alice Brown",
      dueDate: "2023-12-28",
      daysOverdue: 8,
      fine: 16.0,
    },
  ]

  const recentBooks = [
    {
      id: 1,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0-316-76948-0",
      category: "Fiction",
      status: "available",
      copies: 3,
    },
    {
      id: 2,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0-14-143951-8",
      category: "Romance",
      status: "available",
      copies: 2,
    },
  ]

  const handleApproveRequest = (requestId: number) => {
    toast({
      title: "Request approved",
      description: "Borrowing request has been approved successfully.",
    })
  }

  const handleRejectRequest = (requestId: number) => {
    toast({
      title: "Request rejected",
      description: "Borrowing request has been rejected.",
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">Welcome, Staff</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-2xl">{pendingRequests.length}</h3>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-2xl">{overdueBooks.length}</h3>
              <p className="text-sm text-gray-600">Overdue Books</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-2xl">156</h3>
              <p className="text-sm text-gray-600">Total Books</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-2xl">89</h3>
              <p className="text-sm text-gray-600">Active Readers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">Borrowing Requests</TabsTrigger>
            <TabsTrigger value="overdue">Overdue Books</TabsTrigger>
            <TabsTrigger value="books">Book Management</TabsTrigger>
            <TabsTrigger value="readers">Reader Management</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Borrowing Requests</CardTitle>
                <CardDescription>Review and approve borrowing requests from readers</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{request.bookTitle}</h4>
                          <p className="text-sm text-gray-600">Requested by: {request.readerName}</p>
                          <p className="text-sm text-gray-500">Email: {request.readerEmail}</p>
                          <p className="text-sm text-gray-500">Date: {request.requestDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No pending requests</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overdue Books</CardTitle>
                <CardDescription>Manage overdue books and fines</CardDescription>
              </CardHeader>
              <CardContent>
                {overdueBooks.length > 0 ? (
                  <div className="space-y-4">
                    {overdueBooks.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                        <div>
                          <h4 className="font-semibold">{book.bookTitle}</h4>
                          <p className="text-sm text-gray-600">Reader: {book.readerName}</p>
                          <p className="text-sm text-red-600">
                            Due: {book.dueDate} ({book.daysOverdue} days overdue)
                          </p>
                          <p className="text-sm font-medium">Fine: ${book.fine.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                          <Button size="sm">Process Return</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No overdue books</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Book Catalog Management</CardTitle>
                    <CardDescription>Add, edit, and manage library books</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Book
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search books by title, author, or ISBN..." className="pl-10" />
                  </div>
                </div>
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{book.title}</h4>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-500">
                          ISBN: {book.isbn} | Category: {book.category}
                        </p>
                        <p className="text-sm text-gray-500">Copies available: {book.copies}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={book.status === "available" ? "default" : "secondary"}>{book.status}</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="readers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reader Management</CardTitle>
                <CardDescription>Manage library member accounts and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search readers by name or email..." className="pl-10" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-gray-600">john.doe@example.com</p>
                      <p className="text-sm text-gray-500">Member since: 2023-01-15</p>
                      <p className="text-sm text-gray-500">Books borrowed: 12 | Current: 2</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Active</Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Send Message
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Jane Smith</h4>
                      <p className="text-sm text-gray-600">jane.smith@example.com</p>
                      <p className="text-sm text-gray-500">Member since: 2023-03-20</p>
                      <p className="text-sm text-gray-500">Books borrowed: 8 | Current: 1</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Active</Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
