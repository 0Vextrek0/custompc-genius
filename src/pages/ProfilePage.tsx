
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pcBuilds, componentTypes } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Edit, 
  MoreVertical, 
  Package, 
  Settings, 
  Star, 
  Trash, 
  User, 
  UserCircle,
  Copy,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Mock saved builds
const savedBuilds = [
  { ...pcBuilds[0], custom: true, date: "2023-08-15" },
  { ...pcBuilds[1], custom: true, date: "2023-07-22" },
  {
    ...pcBuilds[0],
    id: "custom1",
    name: "My Custom Gaming Rig",
    description: "A custom build I created for gaming and streaming",
    custom: true,
    date: "2023-09-05",
  },
];

// Mock comparison builds
const comparisonBuilds = [savedBuilds[0], savedBuilds[1]];

const ProfilePage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedBuild, setSelectedBuild] = useState(savedBuilds[0]);
  const [selectedCompareBuilds, setSelectedCompareBuilds] = useState(comparisonBuilds);

  const handleDeleteBuild = (buildId: string) => {
    toast({
      title: "Build Deleted",
      description: "The build has been removed from your profile.",
      variant: "default",
    });
  };

  const handleDownloadBuild = (buildId: string) => {
    toast({
      title: "Build Downloaded",
      description: "Your build details have been downloaded.",
      variant: "default",
    });
  };

  const handleRemoveFromCompare = (buildId: string) => {
    setSelectedCompareBuilds(selectedCompareBuilds.filter(build => build.id !== buildId));
    toast({
      title: "Removed from Compare",
      description: "Build has been removed from comparison list.",
      variant: "default",
    });
  };

  const handleAddToCompare = (buildId: string) => {
    const buildToAdd = savedBuilds.find(build => build.id === buildId);
    if (buildToAdd && !selectedCompareBuilds.some(build => build.id === buildId)) {
      setSelectedCompareBuilds([...selectedCompareBuilds, buildToAdd]);
      toast({
        title: "Added to Compare",
        description: "Build has been added to comparison list.",
        variant: "default",
      });
    } else {
      toast({
        title: "Already in Compare",
        description: "This build is already in your comparison list.",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">PC Enthusiast</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="default" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="builds" className="space-y-6">
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="builds" className="min-w-[120px]">
              <Package className="h-4 w-4 mr-2" />
              Saved Builds
            </TabsTrigger>
            <TabsTrigger value="compare" className="min-w-[120px]">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="account" className="min-w-[120px]">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builds" className="space-y-6">
            <div className="grid md:grid-cols-[280px_1fr] gap-6">
              {/* List of saved builds */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Builds</CardTitle>
                  <CardDescription>
                    {savedBuilds.length} builds saved to your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto px-6">
                    {savedBuilds.map((build) => (
                      <div
                        key={build.id}
                        className={`p-3 rounded-lg transition-colors cursor-pointer ${
                          selectedBuild.id === build.id
                            ? "bg-secondary"
                            : "hover:bg-secondary/50"
                        }`}
                        onClick={() => setSelectedBuild(build)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{build.name}</h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              ${build.price.toLocaleString()} • {build.date}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAddToCompare(build.id)}>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Add to Compare
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadBuild(build.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Build
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteBuild(build.id)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Build
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t mt-2 py-3">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/configurator">
                      <Package className="h-4 w-4 mr-2" />
                      Create New Build
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Build details */}
              {selectedBuild && (
                <motion.div
                  key={selectedBuild.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedBuild.name}</CardTitle>
                          <CardDescription>{selectedBuild.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{selectedBuild.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">${selectedBuild.price.toLocaleString()}</Badge>
                        <Badge variant="secondary">{selectedBuild.category}</Badge>
                        {selectedBuild.purpose.map((tag) => (
                          <Badge key={tag} variant="secondary" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={selectedBuild.image}
                            alt={selectedBuild.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-medium">Build Summary</h3>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="text-muted-foreground">Total Price:</div>
                            <div className="font-medium">${selectedBuild.price.toLocaleString()}</div>
                            <div className="text-muted-foreground">Components:</div>
                            <div className="font-medium">{selectedBuild.components.length}</div>
                            <div className="text-muted-foreground">Created:</div>
                            <div className="font-medium">{selectedBuild.date}</div>
                            <div className="text-muted-foreground">Type:</div>
                            <div className="font-medium capitalize">{selectedBuild.category}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium">Components</h3>
                        <div className="space-y-3">
                          {componentTypes.map((type) => {
                            const component = selectedBuild.components.find(
                              (c) => c.type === type.id
                            );
                            return (
                              <div key={type.id} className="bg-muted/30 rounded-lg p-3">
                                <div className="text-sm text-muted-foreground mb-1">
                                  {type.name}
                                </div>
                                {component ? (
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                                        <img
                                          src={component.image}
                                          alt={component.name}
                                          className="w-8 h-8 object-contain"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium text-sm">{component.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {component.brand}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sm font-medium">${component.price}</div>
                                  </div>
                                ) : (
                                  <div className="text-sm italic text-muted-foreground">
                                    Not included
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <Button variant="outline" onClick={() => handleAddToCompare(selectedBuild.id)}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Add to Compare
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => handleDownloadBuild(selectedBuild.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button>
                          <Copy className="h-4 w-4 mr-2" />
                          Clone Build
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>
          
          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compare Your Builds</CardTitle>
                <CardDescription>
                  View your builds side by side to compare components and specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCompareBuilds.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Component</TableHead>
                          {selectedCompareBuilds.map((build) => (
                            <TableHead key={build.id} className="min-w-[250px]">
                              <div className="flex items-center justify-between">
                                <span>{build.name}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRemoveFromCompare(build.id)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Price</TableCell>
                          {selectedCompareBuilds.map((build) => (
                            <TableCell key={`${build.id}-price`} className="font-bold">
                              ${build.price.toLocaleString()}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Category</TableCell>
                          {selectedCompareBuilds.map((build) => (
                            <TableCell key={`${build.id}-category`}>
                              {build.category}
                            </TableCell>
                          ))}
                        </TableRow>
                        {componentTypes.map((type) => (
                          <TableRow key={type.id}>
                            <TableCell className="font-medium">{type.name}</TableCell>
                            {selectedCompareBuilds.map((build) => {
                              const component = build.components.find(c => c.type === type.id);
                              return (
                                <TableCell key={`${build.id}-${type.id}`}>
                                  {component ? (
                                    <div className="flex items-center space-x-2">
                                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                        <img 
                                          src={component.image} 
                                          alt={component.name}
                                          className="w-6 h-6 object-contain" 
                                        />
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">{component.name}</div>
                                        <div className="text-xs text-muted-foreground">${component.price}</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-sm italic text-muted-foreground">Not included</span>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No builds to compare</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Add builds to your comparison list to see them side by side
                    </p>
                    <Button asChild>
                      <Link to="/builds">Browse Builds</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {selectedCompareBuilds.length > 0 && (
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/compare">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Go to Full Compare Page
                    </Link>
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Comparison
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">John Doe</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">john.doe@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">January 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Builds Created</p>
                        <p className="font-medium">{savedBuilds.length}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <div className="mt-2 space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile Information
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
