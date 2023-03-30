package krimselis.service.impl;

import krimselis.dto.CommentDto;
import krimselis.entity.Comment;
import krimselis.entity.Post;
import krimselis.mapper.CommentMapper;
import krimselis.repository.CommentRepository;
import krimselis.repository.PostRepository;
import krimselis.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Override
    public void createComment(String postUrl, CommentDto commentDto) {

        Post post = postRepository.findByUrl(postUrl).get();
        Comment comment = CommentMapper.mapToComment(commentDto);
        comment.setPost(post);
        commentRepository.save(comment);
    }

    @Override
    public List<CommentDto> findAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .map(CommentMapper::mapToCommentDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<CommentDto> findCommentsByPost() {
//        String email = SecurityUtils.getCurrentUser().getUsername();
//        User createdBy = userRepository.findByEmail(email);
//        Long userId = createdBy.getId();
//        List<Comment> comments = commentRepository.findCommentsByPost(userId);
//        return comments.stream()
//                .map((comment) -> CommentMapper.mapToCommentDto(comment))
//                .collect(Collectors.toList());
        return null;
    }
}
