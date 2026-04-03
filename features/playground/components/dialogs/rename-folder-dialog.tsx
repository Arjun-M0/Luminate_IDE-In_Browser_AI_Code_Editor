"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFolderName: string;
  onRename?: (newFolderName: string) => void;
  onRenameFolder?: (newFolderName: string) => void;
}

const RenameFolderDialog = ({
  isOpen,
  onClose,
  currentFolderName,
  onRename,
  onRenameFolder,
}: RenameFolderDialogProps) => {
  const [folderName, setFolderName] = React.useState(currentFolderName);

  React.useEffect(() => {
    if (isOpen) {
      setFolderName(currentFolderName);
    }
  }, [isOpen, currentFolderName]);

  const handleSubmit = () => {
    const trimmedName = folderName.trim();
    if (!trimmedName) return;

    if (onRename) onRename(trimmedName);
    if (onRenameFolder) onRenameFolder(trimmedName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription>Update the folder name.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="rename-folder-name">Folder name</Label>
          <Input
            id="rename-folder-name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFolderDialog;
